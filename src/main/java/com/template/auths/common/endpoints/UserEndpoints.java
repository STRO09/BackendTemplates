package com.template.auths.common.endpoints;

public final class UserEndpoints {

    private UserEndpoints() {}

    // Base
    public static final String BASE = "/api/v1/users";

    // CRUD
    public static final String GET_ALL = "";
    public static final String GET_BY_ID = "/{id}";
    public static final String CREATE = "";
    public static final String UPDATE = "/{id}";
    public static final String DELETE = "/{id}";
}