import argon2 from "argon2";

export const verifyPassword = async (
  hashedPassword: string,
  plainPassword: string
) => {
  return argon2.verify(hashedPassword, plainPassword);
};

export const hashPassword = (password: string) => {
  return argon2.hash(password);
};