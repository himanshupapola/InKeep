package org.himanshu.inkeep.controller;

import lombok.RequiredArgsConstructor;
import org.himanshu.inkeep.dto.DiaryEntryRequest;
import org.himanshu.inkeep.dto.DiaryEntryResponse;
import org.himanshu.inkeep.model.DiaryEntry;
import org.himanshu.inkeep.service.DiaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    @PostMapping("/create")
    public DiaryEntry createDiaryEntry(@RequestBody DiaryEntryRequest request, Principal principal) {
        String email = principal.getName();
        return diaryService.saveDiaryEntry(request, email);
    }

    @GetMapping("/get")
    public List<DiaryEntryResponse> getAllDiaryEntries(Principal principal) {
        String email = principal.getName();
        return diaryService.getAllEntriesForUser(email);
    }

    @GetMapping("/average-mood")
    public ResponseEntity<Double> getAverageMood(Principal principal) {
        String email = principal.getName();
        double avgMood = diaryService.getAverageMood(email);
        return ResponseEntity.ok(avgMood);
    }

    @DeleteMapping("/delete-entry/{id}")
    public ResponseEntity<String> deleteDiaryEntry(@PathVariable UUID id, Principal principal) {
        String email = principal.getName();
        boolean deleted = diaryService.deleteDiaryEntryById(id, email);
        if (deleted) {
        return ResponseEntity.ok("Entry deleted successfully");
    } else {
        return ResponseEntity.status(403).body("Unauthorized or entry not found");
    }
}

    @PutMapping("/update-entry/{id}")
    public ResponseEntity<?> updateDiaryEntry(
            @PathVariable UUID id,
            @RequestBody DiaryEntryRequest request
    ) {
        return ResponseEntity.ok(diaryService.updateDiaryEntryById(id, request)); // ✅ exact method name
    }


}