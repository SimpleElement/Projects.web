package database.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_points")
public class Point implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jpaSequence")
    private long id;
    @Column(name = "x")
    private double x;
    @Column(name = "y")
    private double y;
    @Column(name = "r")
    private double r;
    @Column(name = "hit_result")
    private boolean hitResult;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    public Point(User user, String x, String y, String r) {
        try {
            this.id = 0;
            this.user = user;
            this.x = Double.parseDouble(x);
            this.y = Double.parseDouble(y);
            this.r = Double.parseDouble(r);
            this.hitResult = computeHitResult();
        } catch (Exception e) {
            this.user = null;
        }
    }

    private boolean computeHitResult() {
        if (this.r >= 0) {
            return (checkPositiveTriangle(this.x, this.y, this.r) ||  checkPositiveRectangle(this.x, this.y, this.r) || checkPositiveSemicircle(this.x, this.y, this.r));
        } else {
            return (checkNegativeTriangle(this.x, this.y, this.r) ||  checkNegativeRectangle(this.x, this.y, this.r) || checkNegativeSemicircle(this.x, this.y, this.r));
        }
    }

    private boolean checkPositiveTriangle(Double x, Double y, Double r) {
        if ((x >= 0 && y >= 0) &&
                (x + y <= r / 2)) {
            return true;
        }
        return false;
    }

    private boolean checkPositiveRectangle(Double x, Double y, Double r) {
        if (
                (0 <= x && x <= r) &&
                        (0 >= y && y >= -r / 2)
        )
            return true;
        return false;
    }

    private boolean checkPositiveSemicircle(Double x, Double y, Double r) {
        if (
                (x <= 0 && y >= 0) &&
                        (x*x + y*y <= (r / 2) * (r / 2))
        ) {
            return true;
        }
        return false;
    }

    private boolean checkNegativeTriangle(Double x, Double y, Double r) {
        if ((x <= 0 && y >= 0) &&
                (-x + y <= - r / 2)) {
            return true;
        }
        return false;
    }

    private boolean checkNegativeRectangle(Double x, Double y, Double r) {
        if (
                (0 >= x && x >= r) &&
                        (0 >= y && y >= r/2)
        ) {
            return true;
        }
        return false;
    }

    private boolean checkNegativeSemicircle(Double x, Double y, Double r) {
        if (
                (x >= 0 && y >= 0) &&
                        (x*x + y*y <= (r / 2) * (r / 2))
        ) {
            return true;
        }
        return false;
    }
}