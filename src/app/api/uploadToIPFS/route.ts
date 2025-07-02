import {NextRequest , NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();

        const response  = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${process.env.PINIATA_JWT}`,
            },
            body : JSON.stringify({
                piniataMetadat : {
                    name: body.BatchId || "Raw Material Data",
                },
                piniataContent : body,
            }),
        });

        const data =await response.json();

        if(!response.ok){
            return NextResponse.json({success : false, error: data}, {status : 500});
        }

        return NextResponse.json({
            success : true,
            cid : data.IpfsHash,
            pinSize : data.Pinsize,
            timestamp : data.timestamp,
        }, {status : 200});
    }
    catch(err : any){
        return NextResponse.json({success : false, error: err.message},{ status : 500});
    }
}
