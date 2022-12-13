package adventofcode;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

// https://adventofcode.com/2022
class AdventOfCodeDay1 {

    @Test
    void twoRocksAreA4() {
        Assertions.assertThat(playRockPaperScissor("A", "X")).isEqualTo(4);
    }

    @Test
    void twoPaperAreA5() {
        Assertions.assertThat(playRockPaperScissor("B", "Y")).isEqualTo(5);
    }

    private int playRockPaperScissor(String myShape, String otherShape) {
        return 4;
    }

    @Test
    @Disabled
    public void readInputFromFile() {

        //FileReader.readRawInput(1, s -> s)));

    }
}
