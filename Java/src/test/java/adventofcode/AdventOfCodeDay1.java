package adventofcode;

import com.google.common.collect.Lists;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.List.of;
import static org.junit.jupiter.api.Assertions.assertEquals;

// https://adventofcode.com/2021
public class AdventOfCodeDay1 {

    public static final int SIZE_OFPARTITION = 3;

    @Test
    public void countEmptyOrOneNumber() {
        assertEquals(0, countIncrease(of()));
        assertEquals(0, countIncrease(of(1)));
    }

    @Test
    public void shouldCountIncreaseOfTwoNumbers() {
        assertEquals(1, countIncrease(of(8, 10)));
    }

    @Test
    public void  shouldCountIncreaseOfThreeNumbers() {
        assertEquals(2, countIncrease(of(8, 10, 16)));
    }

    @Test
    public void  shouldCountIncreaseOfAnyNumbers() {
        assertEquals(7, countIncrease(of(199, 200, 208, 210, 200, 207, 240, 269, 260, 263)));
    }

    @Test
    public void shouldBuildSumThreeElements() {
        assertEquals(of(6), partitionAndSum(of(1, 2, 3)));
    }

    @Test
    public void shouldBuildTwoSumsOfFourElements() {
        assertEquals(of(6, 10), partitionAndSum(of(1, 2, 3, 5)));
    }

    @Test
    public void shouldBuildMultipleSums() {
        assertEquals(of(607, 618, 618, 617, 647, 716, 769, 792), partitionAndSum(of(199, 200, 208, 210, 200, 207, 240, 269, 260, 263)));
    }

    @Test
    public void countAllIncreaseFromInput() {
        assertEquals(1527, countIncreaseFromInput());
    }

    @Test
    public void countIncreasePartionsOf3FromInput() {
        assertEquals(1575, countAllSumOf3());
    }

    private int countIncreaseFromInput() {
        return countIncrease(FileReader.readRawInput(1, s -> Integer.parseInt(s)));
    }

    private int countAllSumOf3() {
        return countIncrease(partitionAndSum(FileReader.readRawInput(1, s -> Integer.parseInt(s))));
    }

    private int countIncrease(List<Integer> numbers) {
        if (numbers.isEmpty() || numbers.size() == 1)
            return 0;

        var ref = new Object() {
            int count = 0;
        };

        numbers.stream().reduce((a, b) -> {
            if (a < b) {
                ref.count++;
            }
            return b;
        });
        return ref.count;
    }

    private int countIncreaseOrg(List<Integer> numbers) {
        if (numbers.isEmpty() || numbers.size() == 1)
            return 0;

        int count = 0;
        for (int i = 0; i < numbers.size() - 1; i++) {
            if (numbers.get(i) < numbers.get(i + 1))
                count++;
        }
        return count;
    }

    public List<Integer> partitionAndSum(List<Integer> integers) {
        List<Integer> partition1 = partionBy3AndSum(integers, 0);
        List<Integer> partition2 = partionBy3AndSum(integers, 1);
        List<Integer> partition3 = partionBy3AndSum(integers, 2);

        return mergePartitions(partition1, partition2, partition3);
    }

    private ArrayList<Integer> mergePartitions(List<Integer> partition1, List<Integer> partition2, List<Integer> partition3) {
        ArrayList<Integer> sumOf = new ArrayList<>();
        for (int i = 0; i < partition1.size(); i++) {
            if (partition1.size() > i)
                sumOf.add(partition1.get(i));
            if (partition2.size() > i)
                sumOf.add(partition2.get(i));
            if (partition3.size() > i)
                sumOf.add(partition3.get(i));
        }
        return sumOf;
    }

    private List<Integer> partionBy3AndSum(List<Integer> integers, int fromIndex) {
        List<Integer> partionOfSums = of();
        if (integers.size() >= SIZE_OFPARTITION + fromIndex) {
            List<List<Integer>> partition2 = Lists.partition(integers.subList(fromIndex, integers.size()), SIZE_OFPARTITION);
            partionOfSums = partition2.stream()
                    .filter(l -> l.size() == SIZE_OFPARTITION)
                    .map(l -> l.stream().mapToInt(Integer::intValue).sum()).collect(Collectors.toList());
        }
        return partionOfSums;
    }

}
