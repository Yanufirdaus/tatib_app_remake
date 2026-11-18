import argon2 from "argon2";
export const verifyPassword = async (hashedPassword, plainPassword) => {
    return argon2.verify(hashedPassword, plainPassword);
};
export const hashPassword = (password) => {
    return argon2.hash(password);
};
