package org.migor.hebs.repository;

import org.migor.hebs.domain.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Spring Data MongoDB repository for the Note entity.
 */
public interface NoteRepository extends MongoRepository<Note, String> {
    Page<Note> findAll(Pageable pageable);

    // see http://docs.mongodb.org/manual/reference/operator/query/text/#op._S_text
    // todo fix $text search query
    @Query(value = "{ $text: { $search: '?0' } }")
    Page<Note> findByQuery(String query, Pageable pageable);
    @Query(value = "{ $text: { $search: '?0' } }")
    Page<Note> findByInPublicAndQuery(boolean inPublic, String query, Pageable pageable);

    Page<Note> findByInPublic(boolean inPublic, Pageable pageable);

}
