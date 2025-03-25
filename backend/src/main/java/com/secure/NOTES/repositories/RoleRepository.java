package com.secure.NOTES.repositories;

import com.secure.NOTES.models.AppRole;
import com.secure.NOTES.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(AppRole appRole);

}
