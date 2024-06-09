public class p1 {
    public static  void print1(int n){
        for(int i=1;i<=n;i++){
            for(int j=n;j>=i;j--){
                System.out.println("*");
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
        int n=5;
        print1(n);
    }
}
