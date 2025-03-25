package com.secure.NOTES.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "roles")
public class Role{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer roleId;

    @ToString.Exclude
    @Enumerated(EnumType.STRING)
    @Column(length = 20, name = "role_name")
   // private AppRole roleName;
    private AppRole roleName;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    //cascade = {CascadeType.MERGE} → If the Role entity is updated, related User entities will also be updated (merged into persistence context).
    //mappedBy = "role" → The inverse side of the relationship.
    //
    //This means that in the User entity, there should be a @ManyToOne mapping to the Role entity using the field name "role".

    @JsonBackReference //Used with Jackson (JSON Serialization/Deserialization) to prevent infinite recursion issues when converting entities to JSON.
    @ToString.Exclude
    private Set<User> users = new HashSet<>();

    public Role(AppRole roleName) {
        this.roleName = roleName;
    }
}
