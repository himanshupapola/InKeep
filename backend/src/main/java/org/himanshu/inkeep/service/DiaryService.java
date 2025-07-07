package org.himanshu.inkeep.service;

import lombok.RequiredArgsConstructor;
import org.himanshu.inkeep.dto.DiaryEntryRequest;
import org.himanshu.inkeep.dto.DiaryEntryResponse;
import org.himanshu.inkeep.model.DiaryEntry;
import org.himanshu.inkeep.repository.DiaryEntryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryEntryRepository diaryEntryRepository;

    public DiaryEntry saveDiaryEntry(DiaryEntryRequest request, String email) {
        DiaryEntry entry = DiaryEntry.builder()
                .email(email)
                .title(request.getTitle())
                .diaryEntry(request.getDiaryEntry())
                .mood(request.getMood())
                .entryDate(LocalDate.parse(request.getEntryDate()))
                .build();

        return diaryEntryRepository.save(entry);
    }

    public List<DiaryEntryResponse> getAllEntriesForUser(String email) {
        List<DiaryEntry> entries = diaryEntryRepository.findByEmail(email);
        return entries.stream()
                .map(DiaryEntryResponse::fromEntity)
                .toList();
    }

    public double getAverageMood(String email) {
        List<Integer> moods = diaryEntryRepository.findByEmail(email).stream()
                .map(DiaryEntry::getMood)
                .filter(mood -> mood != null)
                .toList();

        if (moods.isEmpty()) return 0.0;

        double avg = moods.stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);

        return Math.max(0, Math.min(5, avg));
    }

    public boolean deleteDiaryEntryById(UUID id, String userEmail) {
        Optional<DiaryEntry> entryOpt = diaryEntryRepository.findById(id);
        if (entryOpt.isPresent() && entryOpt.get().getEmail().equals(userEmail)) {
            diaryEntryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public DiaryEntry updateDiaryEntryById(UUID id, DiaryEntryRequest request) {
        DiaryEntry entry = diaryEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found"));

        entry.setTitle(request.getTitle());
        entry.setDiaryEntry(request.getDiaryEntry());
        entry.setMood(request.getMood());
        entry.setEntryDate(LocalDate.parse(request.getEntryDate()));

        return diaryEntryRepository.save(entry);
    }


}
