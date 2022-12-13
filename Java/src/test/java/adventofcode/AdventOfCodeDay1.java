package adventofcode;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

// https://adventofcode.com/2022
public class AdventOfCodeDay1 {

    @Test
    public void sameShapesAreADraw() {
        Assertions.assertThat(playRockPaperScissor("A", "X")).isEqualTo(4);
    }

    private int playRockPaperScissor(String myShape, String otherShape) {
        return 0;
    }

    @Test
    @Disabled
    public void readInputFromFile() {

        //FileReader.readRawInput(1, s -> s)));

    }
}
