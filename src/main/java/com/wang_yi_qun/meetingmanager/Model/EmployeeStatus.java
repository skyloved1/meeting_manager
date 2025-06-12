package com.wang_yi_qun.meetingmanager.Model;

import lombok.Getter;

@Getter
public enum EmployeeStatus {
    UNVERIFIED(0, "未审核"),
    VERIFYING(1, "正在审核"),
    VERIFIED(2, "已审核");

    private final int code;
    private final String description;

    EmployeeStatus(int code, String description) {
        this.code = code;
        this.description = description;
    }

}
