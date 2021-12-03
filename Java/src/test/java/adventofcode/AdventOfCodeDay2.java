package adventofcode;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static java.util.function.Function.identity;
import static org.assertj.core.api.Assertions.assertThat;

// https://adventofcode.com/2021
public class AdventOfCodeDay2 {

    @Test
    public void shouldMoveForward() {
        var position = SubmarinePosition.defaultSubmarinePosition()
                .move("forward 5")
                .move("forward 3");
        assertThat(position.horizontal()).isEqualTo(8);
    }

    @Test
    public void shouldMoveForwardAndDown() {
        var position = SubmarinePosition.defaultSubmarinePosition()
                .move("down 2")
                .move("forward 5");
        assertThat(position.horizontal()).isEqualTo(5);
        assertThat(position.depth()).isEqualTo(2);
        assertThat(position.aim()).isEqualTo(2);
    }

    @Test
    public void shouldMoveMultipleForwardAndDown() {
        var position = SubmarinePosition.defaultSubmarinePosition()
                .move("forward 5")
                .move("down 5")
                .move("forward 8")
                .move("up 3")
                .move("down 8")
                .move("forward 2");
        assertThat(position.horizontal()).isEqualTo(15);
        assertThat(position.depth()).isEqualTo(10);
        assertThat(position.aim()).isEqualTo(10);
    }

    @Test
    public void shouldMoveDown() {
        var position = SubmarinePosition.defaultSubmarinePosition()
                .move("down 1")
                .move("down 4");
        assertThat(position.depth()).isEqualTo(5);
        assertThat(position.aim()).isEqualTo(5);
    }

    @Test
    public void shouldMoveUp() {
        var position = SubmarinePosition.defaultSubmarinePosition()
                .move("down 4")
                .move("up 1");
        assertThat(position.depth()).isEqualTo(3);
        assertThat(position.aim()).isEqualTo(3);
    }

    @Test
    public void solveDay2() {
        SubmarinePosition position = FileReader.readRawInput(2, identity())
                .stream()
                .reduce(SubmarinePosition.defaultSubmarinePosition(),
                        (pos, instruction) -> pos.move(instruction),
                        (a, b) -> { throw new RuntimeException("Don't execute parallel");}
                );

        assertThat(position.depth()).isEqualTo(785);
        assertThat(position.horizontal()).isEqualTo(2085);
        assertThat(785 * 2085).isEqualTo(1636725);
    }

    @Test
    public void shouldMoveMultipleForwardAndDownWithAim() {
        var position = SubmarinePosition.aimSubmarinePosition()
                .move("forward 5")
                .move("down 5")
                .move("forward 8")
                .move("up 3")
                .move("down 8")
                .move("forward 2");
        assertThat(position.horizontal()).isEqualTo(15);
        assertThat(position.depth()).isEqualTo(60);
        assertThat(position.aim()).isEqualTo(10);
    }

    @Test
    public void solveDay2WithAim() {
        SubmarinePosition position = FileReader.readRawInput(2, identity())
                .stream()
                .reduce(SubmarinePosition.aimSubmarinePosition(),
                        (pos, instruction) -> pos.move(instruction),
                        (a, b) -> { throw new RuntimeException("Don't execute parallel");}
                );

        assertThat(position.depth()).isEqualTo(898205);
        assertThat(position.horizontal()).isEqualTo(2085);
        assertThat(898205 * 2085).isEqualTo(1872757425);
    }

    private static class SubmarinePosition {

        public static SubmarinePosition defaultSubmarinePosition() {
            return new SubmarinePosition();
        }

        public static SubmarinePosition aimSubmarinePosition() {
            return new SubmarinePosition(true);
        }

        private int horizontal;
        private int depth;
        private int aim;

        private boolean withAim;

        private SubmarinePosition(boolean withAim) {
            this(0, 0, 0, withAim);
        }

        private SubmarinePosition() {
            this(0, 0, 0, false);
        }

        public SubmarinePosition(int horizontal, int depth, int aim, boolean withAim) {
            this.horizontal = horizontal;
            this.depth = depth;
            this.aim = aim;
            this.withAim = withAim;
        }

        public SubmarinePosition move(String instruction) {
            String command = instruction.split(" ")[0];
            int value = Integer.parseInt(instruction.split(" ")[1]);

            if (command.equals("down"))
                return new SubmarinePosition(horizontal, withAim ? depth : depth + value, aim + value, withAim);
            if (command.equals("up"))
                return new SubmarinePosition(horizontal, withAim ? depth : depth - value, aim - value, withAim);

            return new SubmarinePosition(horizontal + value,
                    withAim ? depth + value * aim : depth,
                    aim,
                    withAim);
        }

        public int horizontal() {
            return horizontal;
        }

        public int depth() {
            return depth;
        }

        public int aim() {
            return aim;
        }
    }
}
