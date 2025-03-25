package com.secure.NOTES.service;

import com.secure.NOTES.models.AuditLog;
import com.secure.NOTES.models.Note;

import java.util.List;

public interface AuditLogService {

    void logNoteCreation(String username, Note note);

    void logNoteUpdate(String username, Note note);

    void logNoteDeletion(String username, Long noteId);

    List<AuditLog> getAllAuditLogs();

    List<AuditLog> getAllAuditLogsForNoteId(Long id);
}
