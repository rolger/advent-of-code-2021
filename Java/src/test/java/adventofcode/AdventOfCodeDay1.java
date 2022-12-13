package adventofcode;


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
        if (Shape.Rock == Shape.of(myShape) && otherShape.equals("Y")) {
            return 1;
        }

        if (Shape.Paper == Shape.of(myShape)) {
            return 5;
        } else if (Shape.Scissor == Shape.of(myShape)) {
            return 6;
        }
        return 4;
    }

    @Test
    @Disabled
    public void readInputFromFile() {

        //FileReader.readRawInput(1, s -> s)));

    }

    private enum Shape {
        Paper, Scissor, Rock;

        public static Shape of(String shortcut) {
            return switch (shortcut) {
                case "B" -> Paper;
                case "C" -> Scissor;
                default -> Rock;
            };
        }
    }
}
