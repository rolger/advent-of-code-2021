package adventofcode;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

// https://adventofcode.com/2021
public class AdventOfCodeDay3 {

    @Test
    public void shouldMoveForward() {
        int sum = List.of("11100", "10100").stream()
                .mapToInt(AdventOfCodeDay3::extractBitToInt)
                .filter(x -> x == 0)
                .sum();

        Assertions.assertThat(sum).isEqualTo(2);
    }

    private static int extractBitToInt(String s) {
        return Integer.parseInt(s.substring(1, 2));
        // return Integer.parseInt(s.substring(0, 1));
    }

}
