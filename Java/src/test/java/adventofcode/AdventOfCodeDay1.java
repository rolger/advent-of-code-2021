package adventofcode;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.assertThat;

// https://adventofcode.com/2022
class AdventOfCodeDay1 {

    @ParameterizedTest
    @CsvSource(value = {"A,X,4", "B,Y,5", "C,Z,6"})
    void twoShapesAreSame(String myShape, String otherShape, int expectedScore) {
        assertThat(playRockPaperScissor(myShape, otherShape)).isEqualTo(expectedScore);
    }

    @ParameterizedTest
    @CsvSource(value = {"A,Y,1"})
    void myShapeLoses(String myShape, String otherShape, int expectedScore) {
        assertThat(playRockPaperScissor(myShape, otherShape)).isEqualTo(expectedScore);
    }

    private int playRockPaperScissor(String myShape, String otherShape) {
        if (myShape.equals("B")) {
            return 5;
        } else if (myShape.equals("C")) {
            return 6;
        }
        return 4;
    }

    @Test
    @Disabled
    public void readInputFromFile() {

        //FileReader.readRawInput(1, s -> s)));

    }
}
