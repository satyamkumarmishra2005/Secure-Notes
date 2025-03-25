package com.secure.NOTES.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<com.secure.NOTES.models.Note,Long> {
    List<com.secure.NOTES.models.Note> findByOwnerUsername(String ownerUsername);
}
