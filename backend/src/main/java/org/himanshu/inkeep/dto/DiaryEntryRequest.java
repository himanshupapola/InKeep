package org.himanshu.inkeep.dto;

import lombok.Data;

@Data
public class DiaryEntryRequest {
    private String title;
    private String diaryEntry;
    private int mood;
    private String entryDate;
}
