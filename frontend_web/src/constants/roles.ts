export const ROLES = {
    ADMIN: "admin",
    KESISWAAN: "kesiswaan",
    BK: "bk",
    KEPSEK: "kepsek",
} as const;

export type TendikRole = typeof ROLES[keyof typeof ROLES];
