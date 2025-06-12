package com.wang_yi_qun.meetingmanager.Model;

import lombok.Getter;

@Getter
public enum EmployeeRole {
    ADMIN(1, "管理员"),
    EMPLOYEE(2, "普通员工");

    private final int code;
    private final String description;

    EmployeeRole(int code, String description) {
        this.code = code;
        this.description = description;
    }
}
