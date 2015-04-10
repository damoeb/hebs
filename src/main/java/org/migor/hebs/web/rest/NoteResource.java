package org.migor.hebs.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.migor.hebs.domain.Note;
import org.migor.hebs.repository.NoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.ws.rs.QueryParam;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Note.
 */
@RestController
@RequestMapping("/app")
public class NoteResource {

    private final Logger log = LoggerFactory.getLogger(NoteResource.class);

    @Inject
    private NoteRepository noteRepository;

    /**
     * POST  /rest/notes -> Create a new note.
     */
    @RequestMapping(value = "/rest/notes",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void create(@RequestBody Note note) {
        log.debug("REST request to save Note : {}", note);
        noteRepository.save(note);
    }

    /**
     * GET  /rest/notes -> get all the notes.
     */
    @RequestMapping(value = "/rest/notes",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public Page<Note> getAll(@QueryParam("page") Integer page) {
        log.debug("REST request to get all Notes");

        if (page == null || page < 0) {
            page = 0;
        }

        Sort sort = new Sort(
            new Sort.Order(Sort.Direction.ASC, "createdDate")
        );
        PageRequest pageable = new PageRequest(page, 40, sort);

        return noteRepository.findAll(pageable);
    }

    /**
     * GET  /rest/notes/:id -> get the "id" note.
     */
    @RequestMapping(value = "/rest/notes/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Note> get(@PathVariable String id) {
        log.debug("REST request to get Note : {}", id);
        return Optional.ofNullable(noteRepository.findOne(id))
            .map(note -> new ResponseEntity<>(
                note,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /rest/notes/:id -> delete the "id" note.
     */
    @RequestMapping(value = "/rest/notes/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable String id) {
        log.debug("REST request to delete Note : {}", id);
        noteRepository.delete(id);
    }
}
