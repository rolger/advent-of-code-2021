package adventofcode;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

// https://adventofcode.com/2022
class AdventOfCodeDay1 {

    @Test
    void twoShapesAreSame() {
        assertThat(playRockPaperScissor("A", "X")).isEqualTo(4);
        assertThat(playRockPaperScissor("B", "Y")).isEqualTo(5);
        assertThat(playRockPaperScissor("C", "Z")).isEqualTo(6);
    }

    private int playRockPaperScissor(String myShape, String otherShape) {
        if (myShape.equals("B")) {
            return 5;
        }
        return 4;
    }

    @Test
    @Disabled
    public void readInputFromFile() {

        //FileReader.readRawInput(1, s -> s)));

    }
}
