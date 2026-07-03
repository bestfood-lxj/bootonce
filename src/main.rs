use firecrawl::{Client, Format, ScrapeOptions};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Point at your local self-hosted Firecrawl instance.
    // `None::<&str>` means: no API key needed (requires
    // USE_DB_AUTHENTICATION=false on the server).
    let client = Client::new_selfhosted("http://localhost:3002", None::<&str>)?;

    let doc = client
        .scrape(
            "https://example.com",
            ScrapeOptions {
                formats: Some(vec![Format::Markdown]),
                ..Default::default()
            },
        )
        .await?;

    println!("{}", doc.markdown.unwrap_or_default());

    Ok(())
}