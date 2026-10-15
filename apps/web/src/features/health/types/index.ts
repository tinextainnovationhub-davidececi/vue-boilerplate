import type { paths } from "@boilerplate/api-client";

export type Health = paths["/health"]["get"]["responses"][200]["content"]["application/json"];
