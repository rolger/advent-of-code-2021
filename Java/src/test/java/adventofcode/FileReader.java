package adventofcode;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.function.Function;
import java.util.stream.Collectors;

public class FileReader {

    public static <T> List<T> readRawInput(int dayNumber, Function<String, T> mapper) {
        var numbers = new ArrayList<String>();
        try (Scanner scanner = new Scanner(new File("src/main/resources/input" + dayNumber + ".txt"))) {
            while (scanner.hasNextLine()) {
                String zeile = (String) scanner.nextLine();

                if (!zeile.isEmpty())
                    numbers.add(zeile);

            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return numbers.stream().map(mapper).collect(Collectors.toList());
    }

}
