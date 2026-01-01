package org.wldu.webservices.dto.user;

import org.wldu.webservices.auths.User;
import org.wldu.webservices.entities.Role;

import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.stream.Collectors;

public class UserResponseDto {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Integer age;
    private String gender;
    private String createdAt; // ISO string for frontend
    private Set<String> roles;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public UserResponseDto() {}

    public UserResponseDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.age = user.getAge();
        this.gender = user.getGender();
        this.roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        // Convert LocalDateTime to ISO string
        this.createdAt = user.getCreatedAt() != null ? user.getCreatedAt().format(FORMATTER) : null;
    }

    // ✅ Getters
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public Integer getAge() { return age; }
    public String getGender() { return gender; }
    public Set<String> getRoles() { return roles; }
    public String getCreatedAt() { return createdAt; }
}
