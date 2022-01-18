package beans;

import java.io.Serializable;
import java.util.List;
import java.util.ArrayList;

public class EntriesResults implements Serializable {
    private List<Result> entries;

    public EntriesResults() {
        this.entries = new ArrayList<>();
    }

    public void add(Result result) {
        entries.add(result);
    }

    public List<Result> getList() {
        return entries;
    }
}
