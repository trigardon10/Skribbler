package mypackage;

import java.io.IOException;
import java.util.ArrayList;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

@Path("/endpoint")
public class Endpoint {
	
	static String image = "[]";
	ArrayList<String> messages;
	
	@PUT
	@Path("/img")
	@Consumes(MediaType.TEXT_PLAIN)
	public void setImg(String img) throws IOException{
		image = img;
		//return true;
	}
	
	@GET
	@Path("/img")
	public String getImg(){
		return image;
	}
	
	@PUT
	@Path("/msg/{msg}")
	public boolean setMsg(@PathParam("msg") String msg){
		messages.add(msg); 
		return true;
	}
	
	@GET
	@Path("/msg")
	public String[] getMsg(){
		String[] a = new String[messages.size()];
		return messages.toArray(a);
	}
	
	@GET
	@Path("/word")
	public String getWord(){
		return "Hier zufälliges Wort einfügen";
	}
}
