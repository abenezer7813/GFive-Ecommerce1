package org.wldu.webservices.repositories;




import org.springframework.data.jpa.repository.JpaRepository;
import org.wldu.webservices.entities.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);
}
