package gov.ncats.tripod.chemclip;
import java.applet.Applet;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.SystemFlavorMap;
import java.awt.datatransfer.Transferable;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class ChemClipboard extends Applet{
	static String mfile=null;
	static boolean loaded=false;
	@SuppressWarnings("unchecked")
	public static String get(){
		mfile=null;
		loaded=false;
		 java.security.AccessController.doPrivileged(
			        new java.security.PrivilegedAction(){
			            public Object run() {
			                // execute the privileged command
			                mfile=getMolfile();
			                loaded=true;
			                // we must return an object, so we'll return an empty string
			                return new Object();
			            }
			        }
			    );
		 while(!loaded){
			 try {
				Thread.sleep(50);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		 }
		 return mfile;
	}
	public static void set(final String mfile){
		 java.security.AccessController.doPrivileged(
			        new java.security.PrivilegedAction(){
			            public Object run() {
			               setMolfile(mfile);
			                return new Object();
			            }
			        }
			    );
		 
	}
	public static String test(String s){
		return s;
	}
	public static String bytesToMol(byte[] bytes){
		String mret="";
		int s=0;
		for(int i=0;i<bytes.length;i++){
			if(i==s){
				s=i+(int)bytes[i]+1;
				if(i>0)
					mret+="\n";
			}else{
				mret+=((char)bytes[i]);
			}
		}
		return mret;
	}
	public static byte[] molToBytes(String mol){
		byte[] retbytes=("."+mol).getBytes();
		String[] lines = mol.split("\n");
		
		List<Byte> mybytes = new ArrayList<Byte>();
		for(String line:lines){
			int count=line.length();
			byte[] linebytes = ("." + line).getBytes();
			linebytes[0]=(byte)count;
			for(byte b : linebytes){
				mybytes.add(b);
			}
		}
		
		int i=0;
		
		for(Byte b: mybytes){
			retbytes[i]=b;
			i++;
		}
		return retbytes;
	}
	/**
	 * This is very simple. We just look for the known flavors, and convert to molfile.
	 * @return
	 */
	public static String getMolfile(){
		try {
		Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
		SystemFlavorMap myest = (SystemFlavorMap) (SystemFlavorMap
				.getDefaultFlavorMap());
		
			myest.addUnencodedNativeForFlavor(new DataFlavor2("chemical/cml"),
					"MDLCT");
			myest.addFlavorForUnencodedNative("MDLCT", new DataFlavor2(
					"chemical/cml"));
			Transferable tr = clipboard.getContents(null);
			for (DataFlavor df : clipboard.getAvailableDataFlavors()) {
				ByteArrayInputStream bais = (ByteArrayInputStream) tr
						.getTransferData(df);
				String s = bytesToMol(read(bais));
				return s;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return null;
	}
	public static void setMolfile(String mfile){
		final byte[] bytes=molToBytes(mfile);
		Transferable t = new Transferable(){
			@Override
			public Object getTransferData(DataFlavor arg0)
					throws UnsupportedFlavorException, IOException {
				byte[] bytes2= Arrays.copyOf(bytes, bytes.length);
				//System.out.println(bytes2.length);
				ByteArrayInputStream bais = new ByteArrayInputStream(bytes2);
				return bais;
			}
			@Override
			public DataFlavor[] getTransferDataFlavors() {
					DataFlavor df;
					try {
						df = new DataFlavor2("chemical/cml");
						return new DataFlavor[]{df};
					} catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					return null;
			}

			@Override
			public boolean isDataFlavorSupported(DataFlavor arg0) {
				// TODO Auto-generated method stub
				for(DataFlavor df: getTransferDataFlavors()){
					if(df.equals(arg0))return true;
				}
				return false;
			}
			 
		 };
		 	
		    Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
		    SystemFlavorMap myest =(SystemFlavorMap)(SystemFlavorMap.getDefaultFlavorMap());
		    try {
				myest.addUnencodedNativeForFlavor(new DataFlavor2("chemical/cml"), "MDLCT");
				myest.addFlavorForUnencodedNative("MDLCT",new DataFlavor2("chemical/cml"));
		    } catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    
		    clipboard.setContents(t, null);
	}
	public static void main(String[] args) throws ClassNotFoundException, UnsupportedFlavorException, IOException {
		
	}
	public static class DataFlavor2 extends DataFlavor{
		public DataFlavor2(String s) throws ClassNotFoundException{
			super(s);
		}
		@Override 
		public String getMimeType(){
			return "MDLCT";
		}
		
		@Override
		public boolean equals(DataFlavor df){
			if(this.getMimeType().equals(df.getMimeType())){
				return true;
			}
			return false;
		}
		
	}
	public static byte[] read(ByteArrayInputStream bais) throws IOException {
	     byte[] array = new byte[bais.available()];
	     bais.read(array);

	     return array;
	}
}
