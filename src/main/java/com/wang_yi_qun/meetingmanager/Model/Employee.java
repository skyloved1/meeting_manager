package com.wang_yi_qun.meetingmanager.Model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Entity
@NoArgsConstructor(force = true)
@Table(name = "`employee`")
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Data
public class Employee implements UserDetails {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employeeid")
    private int employeeID;
    @Column(name = "employeename")
    private String employeeName;
    @Column(name = "username")
    private String username;
    private String password;
    private String phone;
    private String email;
    @Column(name = "departmentid")
    private String departmentID;
    /// 1：管理员
    /// 2：普通员工
    private int role = 2;

    /// * 0：已注册，未审核启用
    /// * 1：未登入
    /// * 2: 已登入
    private int status;

    public Employee(String employeeName, String username, String password, String phone, String email, String departmentID, int role, int status) {
        this.employeeName = employeeName;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.departmentID = departmentID;
        this.role = role;
        this.status = status;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        switch (status) {
            case 0:
                authorities.add(new SimpleGrantedAuthority("STATUS_UNVERIFIED"));
                break;
            case 1:
                authorities.add(new SimpleGrantedAuthority("STATUS_VERIFIED"));
                break;
            case 2:
                authorities.add(new SimpleGrantedAuthority("STATUS_VERIFYING"));
                break;
            default:
                authorities.add(new SimpleGrantedAuthority("STATUS_UNKNOWN"));
        }
        switch (role) {
            case 1:
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                break;
            case 2:
                authorities.add(new SimpleGrantedAuthority("ROLE_EMPLOYEE"));
                break;

            default:
                authorities.add(new SimpleGrantedAuthority("ROLE_UNKNOWN"));
        }
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return status == 1;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status != 0;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employeeID=" + employeeID +
                ", employeeName='" + employeeName + '\'' +
                ", Username='" + username + '\'' +
                ", Password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", departmentID='" + departmentID + '\'' +
                ", role=" + role +
                ", status=" + status +
                '}';
    }
}
