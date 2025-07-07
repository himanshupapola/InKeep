package org.himanshu.inkeep.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String email;

    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String diaryEntry;

    private int mood;

    private LocalDate entryDate;
}
