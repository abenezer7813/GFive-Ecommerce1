package org.wldu.webservices.dto.user;

import org.wldu.webservices.auths.User;
import org.wldu.webservices.entities.Role;

import java.util.Set;
import java.util.stream.Collectors;

public class UserResponseDto {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Integer age;
    private String gender;
    private Set<String> roles;

    public UserResponseDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.age = user.getAge();
        this.gender = user.getGender();

    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Integer getAge() {
        return age;
    }
    public String getGender() {
        return gender;
    }
    // getters
}

