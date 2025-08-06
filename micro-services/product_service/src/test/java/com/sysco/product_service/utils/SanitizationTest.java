package com.sysco.product_service.utils;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SanitizationTest {

    @Test
    void nullToEmptyString_WithNullInput_ShouldReturnEmptyString() {
        // Given
        String input = null;

        // When
        String result = Sanitization.nullToEmptyString(input);

        // Then
        assertEquals("", result);
    }

    @Test
    void nullToEmptyString_WithValidString_ShouldReturnTrimmedString() {
        // Given
        String input = "  test string  ";

        // When
        String result = Sanitization.nullToEmptyString(input);

        // Then
        assertEquals("test string", result);
    }

    @Test
    void nullToEmptyString_WithEmptyString_ShouldReturnEmptyString() {
        // Given
        String input = "";

        // When
        String result = Sanitization.nullToEmptyString(input);

        // Then
        assertEquals("", result);
    }

    @Test
    void nullToEmptyString_WithWhitespaceOnly_ShouldReturnEmptyString() {
        // Given
        String input = "   ";

        // When
        String result = Sanitization.nullToEmptyString(input);

        // Then
        assertEquals("", result);
    }

    @Test
    void nullToNull_WithNullInput_ShouldReturnNull() {
        // Given
        String input = null;

        // When
        String result = Sanitization.nullToNull(input);

        // Then
        assertNull(result);
    }

    @Test
    void nullToNull_WithEmptyString_ShouldReturnNull() {
        // Given
        String input = "";

        // When
        String result = Sanitization.nullToNull(input);

        // Then
        assertNull(result);
    }

    @Test
    void nullToNull_WithWhitespaceOnly_ShouldReturnNull() {
        // Given
        String input = "   ";

        // When
        String result = Sanitization.nullToNull(input);

        // Then
        assertNull(result);
    }

    @Test
    void nullToNull_WithValidString_ShouldReturnTrimmedString() {
        // Given
        String input = "  valid string  ";

        // When
        String result = Sanitization.nullToNull(input);

        // Then
        assertEquals("valid string", result);
    }

    @Test
    void nullToNull_WithValidStringNoWhitespace_ShouldReturnSameString() {
        // Given
        String input = "validstring";

        // When
        String result = Sanitization.nullToNull(input);

        // Then
        assertEquals("validstring", result);
    }
}
