package org.migor.hebs.repository;

import org.migor.hebs.domain.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Note entity.
 */
public interface NoteRepository extends MongoRepository<Note, String> {
    Page<Note> findAll(Pageable pageable);
}
