import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // const body = await request.json();

    // if (!body.clientApiKey || !body.secretApiKey) {
    //   return new Response(
    //     JSON.stringify({ message: 'Please provide the client and secret key' }),
    //     { status: 400 },
    //   );
    // }

    const project = await db.project.findFirst({
      where: {
        // clientApiKey: body.clientApiKey,
        // secretApiKey: body.secretApiKey,
      },
      include: {
        flags: {
          select: {
            name: true,
            slug: true,
            isToggled: true,
          },
        },
      },
    });

    if (!project) {
      return new Response(JSON.stringify({ message: 'No flags found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(project.flags), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'There was an issue' }), {
      status: 500,
    });
  }
}
