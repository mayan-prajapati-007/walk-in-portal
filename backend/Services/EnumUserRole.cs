namespace Backend.Services;

public enum UserRole
{
    ADMIN,
    USER
}

public static class EnumUserRole {
    public static UserRole GetRole(int role) {
        return role switch
        {
            1 => UserRole.ADMIN,
            2 => UserRole.USER,
            _ => UserRole.USER
        };
    }
}