package com.secure.NOTES.services.impl;

import com.secure.NOTES.models.AuditLog;
import com.secure.NOTES.models.Note;
import com.secure.NOTES.repositories.AuditLogRepository;
import com.secure.NOTES.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditLogServiceImpl implements AuditLogService {
    @Autowired
    AuditLogRepository auditLogRepository;
@Override
    public void logNoteCreation(String username, Note note){
    AuditLog log = new AuditLog();
    log.setAction("CREATE");
    log.setUsername(username);
    log.setNoteId(note.getId());
    log.setTimestamp(LocalDateTime.now());
    log.setNoteContent(note.getContent());
    auditLogRepository.save(log);
    }
@Override
    public void logNoteUpdate(String username, Note note){

    AuditLog log = new AuditLog();
    log.setAction("UPDATE");
    log.setUsername(username);
    log.setNoteId(note.getId());
    log.setTimestamp(LocalDateTime.now());
    log.setNoteContent(note.getContent());
    auditLogRepository.save(log);

    }
@Override
public void logNoteDeletion(String username, Long noteId){
    AuditLog log = new AuditLog();
    log.setAction("DELETE");
    log.setUsername(username);
    log.setNoteId(noteId);
    log.setTimestamp(LocalDateTime.now());
    auditLogRepository.save(log);

    }

    @Override
    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepository.findAll();
    }

    @Override
    public List<AuditLog> getAllAuditLogsForNoteId(Long id) {
        return auditLogRepository.findByNoteId(id);
    }
}
