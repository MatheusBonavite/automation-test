function usernameInRange(username: string): boolean {
    /*  Requirement 6.2.1      
        Required length:
        5-10 characters
    */
    return username?.length >= 5 && username?.length <= 10;
}

function passwordInRange(password: string): boolean {
    /*  Requirement 6.2.3      
        Required length:
        Passwords should consist of 6 characters.
    */
    return password?.length == 6;
}

function usernameOnlyAllowedValues(username: string): boolean {
    /*  Requirement 6.2.1
        Allowed values:
            (48-57) or (x30-x39)
            (65-90) or (x41-x5A)
            (97-122) or (x61-x7A)
    */
    return /^([\x61-\x7A]|[\x30-\x39]|[\x41-\x5A])*$/.test(username);
}

function passwordOnlyAllowedValues(password: string): boolean {
    /*  Requirement 6.2.3
        Allowed values:
            (97-122) or (x61-x7A)
    */
    return /^[\x61-\x7A]*$/.test(password);
}

function validatePassword(password: string): boolean {
    /* 
        Requirement 6.2.3
        Requirement: Passwords should consist of 6 characters, ascii (decimal)
        values 97-122 allowed.
     */
    return passwordInRange(password) && passwordOnlyAllowedValues(password);
}

function validateUserName(username: string): boolean {
    /* 
        Requirement 6.2.1
        Requirement: User names should consist of 5-10 characters, ascii (decimal) values.
        Allowed values:
            (48-57) or (x30-x39)
            (65-90) or (x41-x5A)
            (97-122) or (x61-x7A)
     */
    return usernameOnlyAllowedValues(username) && usernameInRange(username);
}

export {
    passwordInRange,
    usernameInRange,
    passwordOnlyAllowedValues,
    usernameOnlyAllowedValues,
    validatePassword,
    validateUserName,
};
