using System.Security.Cryptography;
using System.Text;
using Murmur;

namespace Conbent.CommonInfrastructure.Helpers;
public static class HashUtility
{
    public static Guid ComputeGuidFromStringAndGuidCollection(IEnumerable<string> stringCollection, params Guid[] guids)
    {
        // Step 1: Concatenate the strings into a single string
        string concatenatedString = string.Join("", stringCollection);

        // Step 2: Convert the GUIDs to strings and concatenate them
        string concatenatedGuids = string.Join("", guids.Select(g => g.ToString()));

        // Step 3: Combine the concatenated strings and GUIDs
        string combinedInput = concatenatedString + concatenatedGuids;

        // Step 4: Compute a 128-bit hash using MurmurHash3
        var murmur = MurmurHash.Create128();
        byte[] hashBytes = murmur.ComputeHash(Encoding.UTF8.GetBytes(combinedInput));

        // Step 5: Convert the 128-bit hash to a GUID
        return new Guid(hashBytes);
    }

    public static Guid ComputeGuidFromStringCollection(IEnumerable<string> stringCollection)
    {
        // Step 1: Concatenate the strings into a single string
        string concatenatedString = string.Join("", stringCollection);

        // Step 2: Compute a 128-bit hash using MurmurHash3
        var murmur = MurmurHash.Create128();
        byte[] hashBytes = murmur.ComputeHash(Encoding.UTF8.GetBytes(concatenatedString));

        // Step 3: Convert the 128-bit hash to a GUID
        return new Guid(hashBytes);
    }
    public static string ToString(this byte[] byteArray)
    {
        var encoding = Encoding.UTF8;
        if (byteArray == null)
            throw new ArgumentNullException(nameof(byteArray));

        if (encoding == null)
            throw new ArgumentNullException(nameof(encoding));
        var builder = new StringBuilder();
        foreach (var @byte in byteArray)
            builder.Append(@byte.ToString("x2"));
        return builder.ToString();
    }

    public static Guid ComputeGuidHash(this string input)
    {
        try
        {
            // Use MurmurHash3 to generate a 128-bit hash
            var murmur = MurmurHash.Create128(); // 128-bit hash
            var hashBytes = murmur.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));

            // Convert the hash bytes to a GUID
            return new Guid(hashBytes);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Guid.NewGuid();
        }
    }
    public static Guid ComputeGuidSumHash(Guid baseGuid, IEnumerable<Guid> guids) => ComputeGuidSumHash(guids.Append(baseGuid));

    public static Guid ComputeGuidSumHash(IEnumerable<Guid> guids)
    {
        try
        {
            var combinedBytes = guids.SelectMany(guid => guid.ToByteArray()).ToArray();
            using var murmur = MurmurHash.Create128();
            var hashBytes = murmur.ComputeHash(combinedBytes);

            return new Guid(hashBytes);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Guid.NewGuid();
        }
    }

    public static int ConvertGuidToStableInt(string guidString)
    {
        var guid = Guid.Parse(guidString);
        var bytes = guid.ToByteArray();
        return BitConverter.ToInt32(bytes, 0);
    }

    public static int ConvertGuidToStableIntCrc32(string guidString)
    {
        if(string.IsNullOrEmpty(guidString)) guidString=new Guid().ToString();
        var guid = Guid.Parse(guidString);
        var bytes = guid.ToByteArray();
        var crc = Crc32.Compute(bytes);
        return (int)crc;
    }
}

public static class Crc32
{
    private static readonly uint[] Table;

    static Crc32()
    {
        Table = new uint[256];
        const uint polynomial = 0xedb88320;
        for (uint i = 0; i < 256; i++)
        {
            var crc = i;
            for (uint j = 8; j > 0; j--)
            {
                if ((crc & 1) == 1)
                {
                    crc = (crc >> 1) ^ polynomial;
                }
                else
                {
                    crc >>= 1;
                }
            }
            Table[i] = crc;
        }
    }

    public static uint Compute(IEnumerable<byte> bytes)
    {
        var crc = 0xffffffff;
        foreach (var b in bytes)
        {
            var tableIndex = (byte)((crc ^ b) & 0xff);
            crc = (crc >> 8) ^ Table[tableIndex];
        }
        return ~crc;
    }
}
