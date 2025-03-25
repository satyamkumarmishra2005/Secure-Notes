package com.secure.NOTES.repositories;

import com.secure.NOTES.models.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByNoteId(Long noteid);
}
