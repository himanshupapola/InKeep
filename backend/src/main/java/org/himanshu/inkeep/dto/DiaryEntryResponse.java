package org.himanshu.inkeep.dto;

import lombok.Data;
import org.himanshu.inkeep.model.DiaryEntry;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class DiaryEntryResponse {
    private UUID id;
    private String title;
    private String diaryEntry;
    private int mood;
    private LocalDate entryDate;

    public static DiaryEntryResponse fromEntity(DiaryEntry entry) {
        DiaryEntryResponse dto = new DiaryEntryResponse();
        dto.setId(entry.getId());
        dto.setTitle(entry.getTitle());
        dto.setDiaryEntry(entry.getDiaryEntry());
        dto.setMood(entry.getMood());
        dto.setEntryDate(entry.getEntryDate());
        return dto;
    }
}
