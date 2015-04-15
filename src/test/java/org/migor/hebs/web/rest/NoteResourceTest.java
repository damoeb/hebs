package org.migor.hebs.web.rest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import org.migor.hebs.Application;
import org.migor.hebs.domain.Note;
import org.migor.hebs.repository.NoteRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NoteResource REST controller.
 *
 * @see NoteResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class NoteResourceTest {

    private static final String DEFAULT_SCOPE = "SAMPLE_TEXT";
    private static final String UPDATED_SCOPE = "UPDATED_TEXT";

    private static final String DEFAULT_CONTENT = "SAMPLE_TEXT";
    private static final String UPDATED_CONTENT = "UPDATED_TEXT";

    private static final String DEFAULT_OWNER = "SAMPLE_TEXT";
    private static final String UPDATED_OWNER = "UPDATED_TEXT";


    @Inject
    private NoteRepository noteRepository;

    private MockMvc restNoteMockMvc;

    private Note note;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        NoteResource noteResource = new NoteResource();
        ReflectionTestUtils.setField(noteResource, "noteRepository", noteRepository);
        this.restNoteMockMvc = MockMvcBuilders.standaloneSetup(noteResource).build();
    }

    @Before
    public void initTest() {
        noteRepository.deleteAll();
        note = new Note();
        note.setScope(DEFAULT_SCOPE);
        note.setContent(DEFAULT_CONTENT);
        note.setOwner(DEFAULT_OWNER);
    }

    @Test
    public void createNote() throws Exception {
//        // Validate the database is empty
//        assertThat(noteRepository.findAll()).hasSize(0);
//
//        // Create the Note
//        restNoteMockMvc.perform(post("/app/rest/notes")
//                .contentType(TestUtil.APPLICATION_JSON_UTF8)
//                .content(TestUtil.convertObjectToJsonBytes(note)))
//                .andExpect(status().isOk());
//
//        // Validate the Note in the database
//        List<Note> notes = noteRepository.findAll();
//        assertThat(notes).hasSize(1);
//        Note testNote = notes.iterator().next();
//        assertThat(testNote.getScope()).isEqualTo(DEFAULT_SCOPE);
//        assertThat(testNote.getContent()).isEqualTo(DEFAULT_CONTENT);
//        assertThat(testNote.getOwner()).isEqualTo(DEFAULT_OWNER);
//    }
//
//    @Test
//    public void getAllNotes() throws Exception {
//        // Initialize the database
//        noteRepository.save(note);
//
//        // Get all the notes
//        restNoteMockMvc.perform(get("/app/rest/notes"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$.[0].id").value(note.getId()))
//                .andExpect(jsonPath("$.[0].scope").value(DEFAULT_SCOPE.toString()))
//                .andExpect(jsonPath("$.[0].content").value(DEFAULT_CONTENT.toString()))
//                .andExpect(jsonPath("$.[0].owner").value(DEFAULT_OWNER.toString()));
//    }
//
//    @Test
//    public void getNote() throws Exception {
//        // Initialize the database
//        noteRepository.save(note);
//
//        // Get the note
//        restNoteMockMvc.perform(get("/app/rest/notes/{id}", note.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//            .andExpect(jsonPath("$.id").value(note.getId()))
//            .andExpect(jsonPath("$.scope").value(DEFAULT_SCOPE.toString()))
//            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
//            .andExpect(jsonPath("$.owner").value(DEFAULT_OWNER.toString()));
//    }
//
//    @Test
//    public void getNonExistingNote() throws Exception {
//        // Get the note
//        restNoteMockMvc.perform(get("/app/rest/notes/{id}", 1L))
//                .andExpect(status().isNotFound());
//    }
//
//    @Test
//    public void updateNote() throws Exception {
//        // Initialize the database
//        noteRepository.save(note);
//
//        // Update the note
//        note.setScope(UPDATED_SCOPE);
//        note.setContent(UPDATED_CONTENT);
//        note.setOwner(UPDATED_OWNER);
//        restNoteMockMvc.perform(post("/app/rest/notes")
//                .contentType(TestUtil.APPLICATION_JSON_UTF8)
//                .content(TestUtil.convertObjectToJsonBytes(note)))
//                .andExpect(status().isOk());
//
//        // Validate the Note in the database
//        List<Note> notes = noteRepository.findAll();
//        assertThat(notes).hasSize(1);
//        Note testNote = notes.iterator().next();
//        assertThat(testNote.getScope()).isEqualTo(UPDATED_SCOPE);
//        assertThat(testNote.getContent()).isEqualTo(UPDATED_CONTENT);
//        assertThat(testNote.getOwner()).isEqualTo(UPDATED_OWNER);;
//    }
//
//    @Test
//    public void deleteNote() throws Exception {
//        // Initialize the database
//        noteRepository.save(note);
//
//        // Get the note
//        restNoteMockMvc.perform(delete("/app/rest/notes/{id}", note.getId())
//                .accept(TestUtil.APPLICATION_JSON_UTF8))
//                .andExpect(status().isOk());
//
//        // Validate the database is empty
//        List<Note> notes = noteRepository.findAll();
//        assertThat(notes).hasSize(0);
    }
}
