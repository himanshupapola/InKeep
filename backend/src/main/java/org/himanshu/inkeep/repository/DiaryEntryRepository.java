package org.himanshu.inkeep.repository;

import org.himanshu.inkeep.model.DiaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, UUID> {
    List<DiaryEntry> findByEmail(String email);

}