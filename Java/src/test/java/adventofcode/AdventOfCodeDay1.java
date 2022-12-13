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

    private int playRockPaperScissor(String myShapeShortcut, String otherShape) {
        Shape myShape = Shape.of(myShapeShortcut);
        if (Shape.Rock == myShape && otherShape.equals("Y")) {
            return myShape.getScore();
        }
        return myShape.getScore() + 3;
    }

    @Test
    @Disabled
    public void readInputFromFile() {

        //FileReader.readRawInput(1, s -> s)));

    }

    private enum Shape {
        Paper(2), Scissor(3), Rock(1);

        private final int score;

        Shape(int score) {
            this.score = score;
        }

        public static Shape of(String shortcut) {
            return switch (shortcut) {
                case "B" -> Paper;
                case "C" -> Scissor;
                default -> Rock;
            };
        }

        public int getScore() {
            return score;
        }
    }
}
