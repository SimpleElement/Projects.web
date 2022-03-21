import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.event.ActionEvent;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@ManagedBean(name = "pointBean", eager = true)
@SessionScoped
public class PointBean {
    private Point pointFromForm = new Point();
    private Point pointFromCanvas = new Point();
    private List<Point> pointList;

    @ManagedProperty("#{dataBase}")
    private DataBase dbManager;


    public void changeX(ActionEvent event){
        UIComponent component = event.getComponent();
        String value = (String) component.getAttributes().get("value");
        pointFromForm.setxValue(Double.parseDouble(value));
    }

    public void addPointFromCanvas() {
        long startTime = System.nanoTime();
        Point currentPoint = new Point();
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss dd.MM.yyyy");
        currentPoint.setCurrentTime(dateFormat.format(new Date(System.currentTimeMillis())));

        pointFromForm.setxValue(pointFromCanvas.getxValue());

        currentPoint.setrValue(pointFromCanvas.getrValue());
        currentPoint.setxValue(pointFromCanvas.getxValue());
        currentPoint.setyValue(pointFromCanvas.getyValue());
        currentPoint.setHitResult(isItInArea(pointFromCanvas));

        String executionTime = String.valueOf(System.nanoTime() - startTime);
        executionTime +=" ns";

        currentPoint.setExecutionTime(executionTime);

        if(dbManager.create(currentPoint)) {
            Collections.reverse(pointList);
            pointList.add(currentPoint);
            Collections.reverse(pointList);
        }
    }


    public boolean isItInArea(Point dot) {
        if (dot != null){
            return isItInArea(dot.getxValue(), dot.getyValue(), dot.getrValue());
        } else return false;
    }

    public boolean isItInArea(double x, double y, double r) {
        return ((isHitRectangle(x, y, r) || isHitCircle(x, y, r) ||
                isHitTriangle(x, y, r)));
    }

    private boolean isHitRectangle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && yValue <= 0 && xValue >= -rValue / 2 && yValue >= -rValue;
    }

    private boolean isHitCircle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue <= 0 && xValue* xValue + yValue * yValue <= (rValue / 2) * (rValue / 2);
    }

    private boolean isHitTriangle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue >= 0 && xValue + yValue <= rValue;
    }

    public void clear() {
        getPointList().forEach(dbManager::delete);
        pointList = new ArrayList<>();
    }

    public boolean checkR(Double r) {
        return r != null && r >= 1 && r<=3;
    }

    public boolean checkX(Double x) {
        double[] xValues = {-3,-2,-1,0,1,2,3,4,5};

        if (x == null) {
            return false;
        }

        for (int i = 0; i < xValues.length; i++){
            if (x == xValues[i]) {
                return true;
            }
        }

        return false;
    }

    public boolean checkY(Double y) {
        return y != null && y >= -3 && y <= 3;
    }


    public List<Point> getPointList() {
        if(pointList == null)
            pointList = dbManager.getAll();
        return pointList;
    }

    public void setPointList(List<Point> pointList) {
        this.pointList = pointList;
    }

    public Point getPointFromForm() {
        return pointFromForm;
    }

    public void setPointFromForm(Point pointFromForm) {
        this.pointFromForm = pointFromForm;
    }

    public Point getPointFromCanvas() {
        return pointFromCanvas;
    }

    public void setPointFromCanvas(Point pointFromCanvas) {
        this.pointFromCanvas = pointFromCanvas;
    }

    public DataBase getDbManager() {
        return dbManager;
    }

    public void setDbManager(DataBase dbManager) {
        this.dbManager = dbManager;
    }
}