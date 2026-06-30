# Resource Architecture

Each API resource (payments, refunds, customers, etc.) is composed of up to four parts:

```
src/
├── data/<resource>/
│   ├── data.ts              # Response type + enums
│   ├── <Resource>.ts        # Sealed public type + transform()
│   └── <Resource>Helper.ts  # Instance methods (optional)
│
└── binders/<resource>/
    ├── <Resource>Binder.ts  # Endpoint methods (create, get, page, ...)
    └── parameters.ts        # Request types per operation
```

## `data.ts` — Response shape

- Defines `*Data` interface extending `Model<'resource-name'>` — the raw API response
- Contains enums (statuses, embed/include options) and `*Links` interfaces
- Source of truth for field names and types; `parameters.ts` reuses fields from here via `Pick`

## `<Resource>.ts` — Sealed type + transform

- Defines `type Resource = Seal<ResourceData, ResourceHelper>`
- `Seal<M, H>` = `Readonly<M> & H` — frozen data properties merged with helper methods
- `transform()` creates the sealed object and recursively transforms embedded sub-resources
- This is what SDK consumers interact with

## `<Resource>Helper.ts` — Instance methods

- Extends `Helper<Data, Resource>` base class (provides `refresh()`, toString, inspect)
- Adds convenience methods for navigating related resources (e.g. `getRefunds()`, `getPayment()`)
- Not every resource needs a custom helper — simple resources use the base `Helper` directly
- Wired to the sealed type via `Object.assign(Object.create(new Helper(...)), data)`

## `<Resource>Binder.ts` — Endpoint methods

- Extends `Binder<ResourceData, Resource>`
- One public method per API operation: `create`, `get`, `page`, `iterate`, `update`, `cancel`/`delete`
- Delegates to `TransformingNetworkClient`, which auto-applies `transform()` to responses

## `parameters.ts` — Request types

- One type per operation (`CreateParameters`, `GetParameters`, `PageParameters`, etc.)
- Composed from the Data interface via `Pick` (preserves optionality) and `PickOptional` (forces optional)
- Request-only fields (not in response) are defined inline here
- Shared mixins (from `src/types/parameters.ts`): `IdempotencyParameter`, `PaginationParameters`, `SortParameter`, `ThrottlingParameter`, `TestModeParameter`
- Nested resources include context params (e.g. `paymentId: string`)

## Wiring

New resources must be registered in `createMollieClient.ts`:
1. Import and register the transformer: `.add('resource-name', transformResource)`
2. Instantiate and expose the binder: `resourceName: new ResourceBinder(transformingNetworkClient)`

Public types are exported from `src/types.ts` (sealed types, parameter type aliases, enums).
`*Data` interfaces and helpers are internal — not exported to consumers.
