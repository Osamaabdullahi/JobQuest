> **Note on `ingestion`:** This app is currently just a Django scaffold
> (no models, no views, not wired into `urls.py`). The actual data-loading
> happens via a **management command**:
> `telemetry/management/commands/import_geocsv.py`, which imports historical
> measurements from a JSON file into a given `WeatherStation`. If you're
> building out a real ingestion pipeline (e.g. live device push), that's the
> natural place to do it — either flesh out `ingestion` or extend this command.

---

## 3. Core Domain Concepts

| Model | App | What it represents |
|---|---|---|
| `User` | accounts | A human account (email + username login). UUID primary key. |
| `APIKey` | accounts | A machine credential tied to a user, used to call the telemetry API. Has its own rate limits. |
| `APIRequestLog` | accounts | One row per authenticated API-key request, used to enforce rate limits. |
| `WeatherStation` | telemetry | A physical weather station (location, instrument name, status, slug). |
| `WeatherMeasurement` | telemetry | A single sensor reading from a station at a point in time (temp, humidity, wind, rain, light, battery health, etc). |
| `WeatherAlert` | telemetry | A heat-stress risk alert (`info` / `warning` / `danger` / `extreme`), auto-generated whenever a measurement is saved. |

### Auto-generated alerts (important behavior)

Every time a `WeatherMeasurement` is saved (via API, admin, script, fixture —
doesn't matter how), a Django signal (`telemetry/signals.py`) automatically:

1. Computes severity from `wbgt` and `heat_index` using banded thresholds
   (`telemetry/severity.py`).
2. Creates a corresponding `WeatherAlert` row with a human-readable message.

So you never create `WeatherAlert` objects directly — they're a derived,
automatic side-effect of recording a measurement.

Severity bands (whichever is more severe of the two wins):

| Severity | WBGT ≥ | Heat Index ≥ |
|---|---|---|
| Extreme | 31.0 | 51.0 |
| Danger | 29.0 | 39.0 |
| Warning | 27.0 | 32.0 |
| Info (safe) | below all thresholds | below all thresholds |

---

## 4. Authentication

There are **two separate auth mechanisms** depending on who's calling:

### A. Human users — JWT (for managing accounts / API keys)

Standard email+password login issuing JWT access/refresh tokens
(`rest_framework_simplejwt`). Used only for the `accounts` endpoints below
(signup, login, managing your own API keys) — **not** for the telemetry data
endpoints.

- Access token lifetime: 30 minutes
- Refresh token lifetime: 7 days

### B. Machine / app clients — API Key (for reading telemetry data)

All `telemetry` endpoints require an **API key**, sent via header:
