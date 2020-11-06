package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.List;
import java.util.concurrent.ExecutionException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import webscraper.TagCounter;
import webscraper.Tester;
import webscraper.TagDTO;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("scrape")
public class WebScraperResource {
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;
    
    @Path("sequental")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getTagsSequental() {
        long startTime = System.nanoTime();
        List<TagCounter> dataFeched = Tester.runSequental();
        long endTime = System.nanoTime()-startTime;
        return TagDTO.getTagsAsJson("Sequental fetching",dataFeched, endTime);
    }
    @Path("parallel")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getTagsParrallel() throws InterruptedException, ExecutionException {
        long startTime = System.nanoTime();
        List<TagDTO> dataFeched = Tester.runParrallel();
        long endTime = System.nanoTime()-startTime;
        return TagDTO.getTagsAsJson2("Parallel fetching",dataFeched, endTime);
    }
    
    
}
